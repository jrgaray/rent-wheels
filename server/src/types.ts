export type HashPasswordFunction = (password: string) => Promise<string>

export type IsValidPasswordFunction = (
    plainTextPassword: string,
    hashedPassword: string
) => boolean

interface ReturnTokens {
    token: string
    refresh: string
}
export type CreateJWTFunction = (
    username: string,
    id: string,
    email: string
) => ReturnTokens
