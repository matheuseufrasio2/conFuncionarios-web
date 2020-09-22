/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// // eslint-disable-next-line import/no-duplicates
// import dataLocal from 'date-fns/locale/pt-BR';

import { Edit, Trash2 } from 'react-feather';
import api from '../../services/api';

import Header from '../../components/Header';

import { Container, TableContainer } from './styles';

interface Employee {
  id: string;
  nome: string;
  endereco: string;
  dataNascimento: Date;
  salario: string;
  genero: string;
  dataNascimentoFormatada: Date;
}

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    api.get('').then(response => {
      setEmployees(response.data);
    });
  }, []);

  async function handleDelete(id: string): Promise<void> {
    const response = await api.delete(`/${id}`);

    if (response.status === 204 || response.status === 200) {
      const filterEmployees = employees.filter(employee => employee.id !== id);
      setEmployees(filterEmployees);
    }
    const ddd = response;

    console.log(response.status);
  }

  return (
    <>
      <Header />
      <Container>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Data de Nascimento</th>
                <th>Salário</th>
                <th>Gênero</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.nome}</td>
                  <td>{employee.endereco}</td>
                  <td>{employee.dataNascimento}</td>
                  <td>{employee.salario}</td>
                  <td>{employee.genero}</td>
                  <td>
                    <a href="/">
                      <Edit color="#5636d3" size={20} />
                    </a>
                    <a href="/" onClick={() => handleDelete(employee.id)}>
                      <Trash2 color="red" size={20} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
