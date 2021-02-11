import React, { FC } from 'react'
import { useMutation } from '@apollo/client'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core'
import ControlledText from 'components/common/ControlledText'
import ControlledCheckbox from 'components/common/ControlledCheckbox'
import { CREATE_CAR } from 'gql/mutations'
import { CreateCarMutationInput, CreateCarMutationOutput } from 'gql/types'
import { useDispatch, useSelector } from 'app/store'
import { closeDialog } from 'ducks/dialogSlice'
import getCars from 'thunks/getCars'
import { CreateCarFormValues } from './types'
import { openNotification } from 'ducks/notificationSlice'

const CreateCarDialog: FC = () => {
    const dispatch = useDispatch()
    const { id: userID } = useSelector(state => state.user)

    const [createCar] = useMutation<
        CreateCarMutationOutput,
        CreateCarMutationInput
    >(CREATE_CAR, {
        onCompleted: data => {
            dispatch(getCars())
            dispatch(closeDialog())
        },
        onError: error =>
            dispatch(
                openNotification({ type: 'error', message: error.message })
            ),
    })
    const { handleSubmit, register, errors, control } = useForm()

    // Submit handler
    const onSubmit: SubmitHandler<CreateCarFormValues> = formValues =>
        userID
            ? createCar({
                  variables: {
                      data: {
                          ...formValues,
                          userID,
                      },
                  },
              })
            : dispatch(
                  openNotification({
                      type: 'error',
                      message: 'Huh, how are you here?',
                  })
              )

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Add Car</DialogTitle>
            <DialogContent>
                <ControlledText
                    register={() => register({ required: true })}
                    label='Make'
                    name='make'
                    errors={errors}
                />
                <ControlledText
                    register={() => register({ required: true })}
                    label='Model'
                    name='model'
                    errors={errors}
                />
                <ControlledText
                    register={() =>
                        register({
                            required: true,
                        })
                    }
                    label='Year'
                    name='year'
                    errors={errors}
                />
                <ControlledText
                    register={() =>
                        register({
                            required: true,
                            validate: (value: string) => {
                                if (value.length !== 17) {
                                    return 'VIN must be 17 characters'
                                }
                            },
                        })
                    }
                    label='VIN'
                    name='vin'
                    errors={errors}
                />
                <ControlledCheckbox
                    name='isActive'
                    control={control}
                    label='Active'
                />
            </DialogContent>
            <DialogActions>
                <Button type='submit' color='primary' variant='contained'>
                    Submit
                </Button>
            </DialogActions>
        </form>
    )
}

export default CreateCarDialog
