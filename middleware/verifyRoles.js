const verifyRoles = ( ...allowedRoles ) => {
    return ( req, res, next ) => {
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log('rolesArray:', rolesArray);
        console.log('req.roles:', req.roles);
        const result = req.roles.map( (role) => rolesArray.includes(role)).find( (value) => value === true );
        // const result = req.roles.find( (role) => !!rolesArray.includes(role));
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles