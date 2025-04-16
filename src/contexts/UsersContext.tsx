import { createContext, useState, useReducer, useEffect } from "react";

import { User, UsersContextTypes, ChildrenProp, UsersReducerActionTypes } from "../types";

const reducer = (state: User[], action: UsersReducerActionTypes): User[] => {
    switch (action.type) {
        case 'setData':
            return action.data;
        case 'addUser':
            fetch(`http://localhost:8080/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(action.newUser)
            })
            return [...state, action.newUser];
        case 'addToWatchlist': {
            return state.map(user => {
                if (user.id !== action.userId) {
                    return user;
                }
                const alreadyInWatchlist = user.watchlistItems?.includes(action.movieId);
                const watchlistUpdate = alreadyInWatchlist ?
                    user.watchlistItems :
                    [...(user.watchlistItems || []), action.movieId];

                fetch(`http://localhost:8080/users/${user.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ watchlistItems: watchlistUpdate })
                });
                return {
                    ...user,
                    watchlistItems: watchlistUpdate
                }
            })
        }
        default:
            return state;
    }
};

const UsersContext = createContext<UsersContextTypes | undefined>(undefined);

const UsersProvider = ({ children }: ChildrenProp) => {

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [users, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        fetch(`http://localhost:8080/users`)
            .then(res => res.json())
            .then((data: User[]) => {
                dispatch({
                    type: 'setData',
                    data: data
                });
            })
        const foundUser = localStorage.getItem('loggedInUser');
        if (foundUser) {
            const parsed = JSON.parse(foundUser);
            setLoggedInUser(parsed);
        }
    }, []);

    useEffect(() => {
        if (!loggedInUser) return;

        const updatedUser = users.find(user => user.id === loggedInUser.id);
        if (updatedUser) {
            setLoggedInUser(updatedUser);
            localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users]);


    return (
        <UsersContext.Provider
            value={{
                loggedInUser,
                setLoggedInUser,
                users,
                dispatch
            }}>
            {children}
        </UsersContext.Provider>
    )
}

export { UsersProvider };
export default UsersContext;