import { ModalComponent, ModalChildren } from '../components/Modal';
import { Table } from 'react-bootstrap';


export function Tabela({th, children}){
    return(
        <div className='table-container'>
        <Table bordered hover responsive>
          <thead>
            <tr>
              {/*cabeçalho tabela*/}
              {th}
              {/*fim cabeçalho tabela*/}
            </tr>
          </thead>

          <tbody>
            {children}
          </tbody>
        </Table>
      </div>
    )
}