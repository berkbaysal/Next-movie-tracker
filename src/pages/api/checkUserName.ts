import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { checkIfUserNameExists } from "../../util/dbFunctions";
import { UserNameRequest } from "../../util/interfaces";

export default async function checkUserName(req: UserNameRequest, res: NextApiResponse) {
    const isUserNameAvailable = await checkIfUserNameExists(req.body.username);
    res.json({usernameAvailable: !isUserNameAvailable})
}

