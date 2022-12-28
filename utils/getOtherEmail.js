const getOtherEmail = (users, currentUser) => {
    const otherUser = users?.filter(user => user !== currentUser.email)[0];

    return otherUser;

}

export default getOtherEmail;