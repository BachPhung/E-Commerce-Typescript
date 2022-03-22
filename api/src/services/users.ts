import User, {UserDocument} from '../models/User'

const create = async (user: UserDocument): Promise<UserDocument> =>{
    return user.save();
}

const findById = async (userId: string): Promise<UserDocument> =>{
    const foundUser = await User.findById(userId);

    if(!foundUser){
        throw new Error(`User ${userId} not found`);
    }
    return foundUser;
}

const findByCredential = async (obj: Object): Promise<UserDocument> => {
    const foundUser = await User.findOne({...obj})
    if(!foundUser){
        throw new Error(`User not found`);
    }
    return foundUser;
}

const findAll = async (): Promise<UserDocument[]> =>{
    return User.find()
}

const update = async(userId:string, updatedUser: Partial<UserDocument>): Promise<UserDocument | null> =>{
    const foundUser = await User.findByIdAndUpdate(userId, updatedUser, {new: true});
    if(!foundUser) {
        throw new Error(`User ${userId} not found`);
    }
    return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> =>{
    const foundUser = await User.findByIdAndDelete(userId)
    if(!foundUser){
        throw new Error(`User ${userId} not found`);
    }
    return foundUser
}

const bannedUser = async (userId: string) : Promise<UserDocument | null> => {
    const foundUser = await User.findById(userId)
    if(!foundUser){
        throw new Error(`User ${userId} not found`);
    }
    foundUser.isBanned = !foundUser.isBanned
    return update(userId, foundUser);
}

export default {
    create,
    findById,
    findAll,
    update,
    deleteUser,
    findByCredential,
    bannedUser
}


