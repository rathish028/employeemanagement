import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from './config';
const Employees = () => {
    let [employeeObj, setEmployeeObj] = useState({
        "name": "",
        "employeeId": "",
        "deparment": "",
        "designation": "",
        "project": "",
        "type": "",
        "status": "",
    });
    let [empList, setEmpList] = useState([])
    let [isNewView, setIsNewView] = useState(false)

    useEffect(() => {
        getAllEmployee();
    }, [])
    const changeView = () => {
        setIsNewView(!isNewView)
    }

    const updateEmpFormValues = (event, key) => {
        setEmployeeObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }


    const createEmployee = async () => {
        const response = await axios.post(`${BACKEND_URL}/create-user`, employeeObj);
        if (response.data.result) {
            alert("Employee Creation Success");
            getAllEmployee()
        } else {
            alert(response.data.message)
        }
    }
    const updateEMp =   async () => {
        const response = await axios.post(`${BACKEND_URL}/update-users`, employeeObj); 
        if (response.data.result) {
            alert("Employee Update Success");
            getAllEmployee()
        } else {
            alert(response.data.message)
        }
    }
    const deletEmp =   async (employeeId) => {
        const isDelet = window.confirm('Are you Sure want to delete');
        if(isDelet) {
            const response = await axios.get(`${BACKEND_URL}/get-users` +employeeId); 
            if (response.data.result) {
                alert("Employee Deleted Success");
                getAllEmployee()
            } else {
                alert(response.data.message)
            }
        }
        
    }


    const getAllEmployee = async () => {
        const result = await axios.get(`${BACKEND_URL}/get-users`);
        setEmpList(result.data.data)
    }

    const getEmployeeById = async (employeeId) => {
        const result =  await axios.get(`${BACKEND_URL}/get-users/:id` + employeeId);
        setEmployeeObj(result.data.data);
        changeView();
    }


    return (
        <div className="container-fluid">
            <div className="mt-2 p-3 bg-primary text-white rounded text-center">
                <h1>Employee Managment</h1>
            </div>
            {
                isNewView && <div className="row pt-2"  >
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header bg-success text-white">
                                <div className="row">
                                    <div className="col-6"> New Employee</div>
                                    <div className="col-6 text-end">
                                        <button className='btn btn-sm btn-primary' onClick={changeView}>List</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-7">
                                        <div className="row">
                                            <div className="col-6">
                                                <label ><b>Name</b></label>
                                                <input type="text" value={employeeObj.name} onChange={(event) => { updateEmpFormValues(event, 'name') }} className="form-control"
                                                    placeholder="Enter Name" />
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <label ><b>EmployeeId</b></label>
                                                <input type="text"  value={employeeObj.employeeId}  onChange={(event) => { updateEmpFormValues(event, 'employeeId') }} className="form-control"
                                                    placeholder="Enter EmployeeId" />
                                            </div>
                                            <div className="col-4">
                                                <label ><b>Department</b></label>
                                                <input type="text"  value={employeeObj.department}  onChange={(event) => { updateEmpFormValues(event, 'department') }} className="form-control"
                                                    placeholder="Enter department" />
                                            </div>
                                            <div className="col-4">
                                                <label ><b>Designation</b></label>
                                                <input type="text"  value={employeeObj.designation}  onChange={(event) => { updateEmpFormValues(event, 'designation') }} className="form-control" placeholder="Enter designation" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <label ><b>project</b></label>
                                                <input type="text"  value={employeeObj.project}  onChange={(event) => { updateEmpFormValues(event, 'project') }} className="form-control" placeholder="Enter project" />
                                            </div>
                                            <div className="col-4">
                                                <label ><b>Type</b></label>
                                                <input type="text"  value={employeeObj.type}  onChange={(event) => { updateEmpFormValues(event, 'type') }} className="form-control" placeholder="Enter type" />
                                            </div>
                                            <div className="col-4">
                                                <label ><b>status</b></label>
                                                <select  value={employeeObj.status}  className="form-control" onChange={(event) => { updateEmpFormValues(event, 'status') }} >
                                                    <option value="">Select</option>
                                                    <option value="Full-time">Full-time</option>
                                                    <option value="part-time">part-time</option>
                                                    <option value="Internship">Internship</option>
                                                </select>  
                                                <div className='row'>
                                                <div className='col-8'>
                                                     <button  type="button" className="btn btn-sm bg-primary" onClick={createEmployee} >
                                                    confirm
                                                </button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
            }
            {
                !isNewView && <div className='row pt-2'>
                    <div className='col-12'>
                        <div className='card'>
                            <div className='card-header bg-success'>
                                <div className="row">
                                    <div className="col-6"> Employee List</div>
                                    <div className="col-6 text-end">
                                        <button className='btn btn-sm btn-primary' onClick={changeView}>create</button>
                                    </div>
                                </div>
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>EmployeeId</th>
                                            <th>Department</th>
                                            <th>Designation</th>
                                            <th>Project</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            empList && empList.map((data) => {
                                                return (<tr>
                                                    <td>{data.name}</td>
                                                    <td>{data.employeeId}</td>
                                                    <td>{data.deparment}</td>
                                                    <td>{data.designation}</td>
                                                    <td>{data.project}</td>
                                                    <td>{data.type}</td>
                                                   <td>{data.status}</td>
                                                    <td>
                                                        <button className='btn btn-sm btn-primary' onClick={()=>{updateEMp(data.employeeId)}}>Edit</button>
                                                        <button className='btn btn-sm btn-danger mx-2' onClick={()=>{deletEmp(data.employeeId)}}>Delete</button>
                                                    </td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            }


        </div>
    );
};

export default Employees;