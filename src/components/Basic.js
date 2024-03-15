import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Basic = () => {
    const [inputUser, setInputUser] = useState({ firstname: "", lastname: "", email: "" })
    const [tableValues, setTableValues] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedData = sessionStorage.getItem('data')
            return storedData ? JSON.parse(storedData) : []
        }
    });
    const [editInd, setEditInd] = useState(null)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputUser({ ...inputUser, [name]: value })
    }
    const handleSubmit = () => {
        const updatedTableVal = [...tableValues]
        if (editInd != null) {
            updatedTableVal[editInd] = inputUser
            setEditInd(null)
        } else {
            updatedTableVal.push(inputUser)
        }
        setTableValues(updatedTableVal)
        setInputUser({ firstname: "", lastname: "", email: "" })
    }
    const handleAction = (action, index) => {
        switch (action) {
            case 'edit':
                setInputUser(tableValues[index])
                setEditInd(index)
                break;
            case 'delete':
                const updatedTableVal = tableValues.filter((_, ind) => ind !== index)
                setTableValues(updatedTableVal)
                break;
            default:
                console.log('wrong action called!')
        }
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('data', JSON.stringify(tableValues))
        }
    }, [tableValues]);

    return (
        <div style={{ padding: "20PX" }}>
            <div>
                <div><input type='text' name='firstname' value={inputUser.firstname} onChange={(e) => handleChange(e)} /></div>
                <div><input type='text' name='lastname' value={inputUser.lastname} onChange={(e) => handleChange(e)} /></div>
                <div><input type='text' name='email' value={inputUser.email} onChange={(e) => handleChange(e)} /></div>
            </div>
            <div>
                <button onClick={() => { handleSubmit() }}>Submit</button>
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>firstname</th>
                            <th>lastname</th>
                            <th>email</th>
                        </tr>
                        {tableValues && tableValues.map((val, ind) => <tr key={ind}>
                            <td className='t_cell'>{val.firstname}</td>
                            <td className='t_cell'>{val.lastname}</td>
                            <td className='t_cell'>{val.email}</td>
                            <td className='t_cell'><EditIcon onClick={() => { handleAction('edit', ind) }} fontSize='sm' /></td>
                            <td className='t_cell'><DeleteIcon onClick={() => { handleAction('delete', ind) }} fontSize='sm' /></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Basic