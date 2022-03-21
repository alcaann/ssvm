
//Database Types
declare type DBUser = { 
    id: UserID, 
    email: UserEmail, 
    name: UserName,
    password: UserPassword,
    loginHistory: UserLoginHistory
};
export declare type UserID = number;
export declare type UserEmail = string;
export declare type UserName = string;
export declare type UserPassword = string;
export declare type UserLoginHistory = Array<Date>;
export declare type User = Omit<DBUser, "loginHistory"|"password">;


export declare type LoginRequest = {
    email: UserEmail,
    password: UserPassword
}

export declare type LoginResponse = GenericResponse;

export declare type GenericResponse = {
    status: boolean,
    message?: string,
    requestBody?:any,
    data?:any
}




//specific types
export declare type NewGameRequest = Omit<DBGame, "upvotes" | "downvotes"> ;



export declare type DBGame = {
    id?: GameID,
    coverImage: GameCover,
    title: GameTitle,
    genre: GameGenre,
    description: GameDescription,
    upvotes: GameVotes,
    downvotes: GameVotes
}

export declare type GameID = number;
export declare type GameCover = string;
export declare type GameTitle = string;
export declare type GameGenre = "Arcade"|"Puzzle"|"Aventuras"|"Acción"|"Tablero"|"Estrategia"|"Multijugador";
export declare type GameDescription = string;
export declare type GameVotes = number;

export declare type MousePosition = {
    x: number,
    y:number
}

export declare type ToastData = {
    title: string,
    msg: string,
    date?: string
}
