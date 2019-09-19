import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userActions } from '../../actions/userActions'
import './Employees.css'
import TableRow from '../../components/UI/Table/TableRow';

class Employees extends Component {

    componentDidMount() {
        this.props.fetchEmployees()
    }

    render() { 
        let tr = [];
        if(this.props.employees.response) {
            for(let key in this.props.employees.data) {
                let emp = this.props.employees.data[key]
                tr.push(
                    <TableRow {...emp} />
                )
            }
        }
        return (
            <div>
                <h2>Employees</h2>
                <table style={{width:'100%'}}>
                    <tr>
                        <th>Id</th>
                        <th>Name</th> 
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Email</th> 
                        <th>Phone No.</th>
                    </tr>
                    {tr}
                    </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        employees: state.employees
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchEmployees: () => dispatch(userActions.fetchEmployees())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employees)