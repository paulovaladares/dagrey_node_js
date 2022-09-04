const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
};

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const { firstname, lastname } = req.body;
    const id = data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1;
    if (!firstname || !lastname) {
        return res.status(400).json({ message: 'First and Last name are required.' });
    }
    data.setEmployees([...data.employees, { id, firstname, lastname }]);
    res.status(200).json(data.employees);
}

const updateEmployee = (req, res) => {
    const { id, firstname, lastname } = req.body;
    const employee = data.employees.find( theOne => theOne.id === id );
    if (!employee) {
        return res.status(400).json( { message: `Employee ID ${id} not found` });
    }
    if (firstname) employee.firstname = firstname;
    if (lastname) employee.lastname = lastname;
    const filteredList = data.employees.filter( theOne => theOne.id !== parseInt(id) );
    const unsortedList = [...filteredList, employee];
    const sortedList = unsortedList.sort( (a, b) => a.id - b.id )
    data.setEmployees(sortedList);
    res.status(200).json(data.employees);
}

const deleteEmployee = (req, res) => {
    const { id } = req.body;
    const employee = data.employees.find( theOne => theOne.id === id );
    if (!employee) {
        return res.status(400).json( { message: `Employee ID ${id} not found` });
    }
    const filteredList = data.employees.filter( theOne => theOne.id !== parseInt(id) );
    data.setEmployees([...filteredList]);
    res.status(200).json(data.employees);
}

const getEmployee = (req, res) => {
    const { id } = req.params;
    const employee = data.employees.find( theOne => theOne.id === parseInt(id) );
    if (!employee) {
        return res.status(400).json( { message: `Employee ID ${id} not found` });
    }
    res.status(200).json(employee);
}

module.exports = { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee }