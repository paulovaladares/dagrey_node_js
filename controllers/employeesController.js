const Employee = require('../model/Employee')

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) return res.status(204).json({ 'message': 'No employees found' });
    res.json(employees);
}

const createNewEmployee = async (req, res) => {
    const { firstname, lastname } = req?.body;
    if (!firstname || !lastname) return res.status(400).json({ message: 'First and Last name are required.' });
    try {
        const result = await Employee.create({ firstname, lastname });
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(err);
    }
}

const updateEmployee = async (req, res) => {
    const { id, firstname, lastname } = req?.body;
    if (!id) {
        return res.status(400).json( { message: `Employee ID required` });
    }
    const employee = await Employee.findOne({ _id: id }).exec();
    if (!employee) {
        return res.status(204).json( { message: `No employee matches ID ${id}` });
    }

    if (firstname) employee.firstname = firstname;
    if (lastname) employee.lastname = lastname;
    const result = await employee.save();
    res.status(200).json(result);
}

const deleteEmployee = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json( { message: `Employee ID required` });
    }
    const employee = await Employee.findOne({ _id: id }).exec();
    if (!employee) {
        return res.status(204).json( { message: `No employee matches ID ${id}` });
    }
    const result = await employee.deleteOne({ _id: id });
    console.log(result);
    res.status(200).json(result);
}

const getEmployee = async (req, res) => {
    const { id } = req?.params;
    if (!id) {
        return res.status(400).json( { message: `Employee ID required` });
    }
    const employee = await Employee.findOne({ _id: id }).exec();
    if (!employee) {
        return res.status(204).json( { message: `No employee matches ID ${id}` });
    }
    res.status(200).json(employee);
}

module.exports = { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee }