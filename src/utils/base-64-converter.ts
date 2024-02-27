import { LoginPayloadDto } from "../auth/dto/loginPayload.dto"

/**
 * Generates a LoginPayloadDto from the provided authorization string.
 *
 * @param {string} authorization - The authorization string
 * @return {LoginPayloadDto | undefined} The parsed LoginPayloadDto, or undefined if the authorization is invalid
 */
export const authorizationToLoginPayload = (authorization: string): LoginPayloadDto | undefined => {
    const authorizationSplited = authorization.split('.');

    if(authorizationSplited.length < 3 || !authorizationSplited[1]){
        return undefined;
    }

    return JSON.parse(Buffer.from(authorizationSplited[1], "base64").toString('ascii'))

}