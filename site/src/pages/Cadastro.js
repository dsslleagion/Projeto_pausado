import React, { useState, useEffect, useRef } from 'react';
import NavigationBar from '../components/NavigationBar';
import Button from '../components/Button';
import './Cadastro.css';
import Footer from '../components/Footer';
import { upload } from '../supabase/upload';
import Swal from 'sweetalert2';



const Cadastro = () => {

  const [formValues, setFormValues] = useState({
    nome: '',
    email: '',
    sexo: '',
    telefone: '',
    bairro: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    redes_sociais: '',
    password: '',
    status: 'ativo',
    profile: 'user',
    imagem: '',
    tribunaIds: [], // Inicializar como array vazio para múltiplas seleções
    candidatoIds: [], // Inicializar como array vazio para múltiplas seleções
    tribunas: [],
    candidatos: []
  });

  const [avatarSRC, setAvatarSRC] = useState('https://cvfggtwoyyhatnhuumla.supabase.co/storage/v1/object/public/usuarios/perfil-sem-foto.png')
  const [icone, setIcone] = useState()
  const inputFile = useRef(null)


  useEffect(() => {
    fetch('http://localhost:3001/tribuna/all')
      .then(response => response.json())
      .then(data => {
        setFormValues(prevState => ({ ...prevState, tribunas: data }));
      })
      .catch(error => console.error('Erro ao carregar tribunas:', error));

    fetch('http://localhost:3001/candidato/all')
      .then(response => response.json())
      .then(data => {
        setFormValues(prevState => ({ ...prevState, candidatos: data }));
      })
      .catch(error => console.error('Erro ao carregar candidatos:', error));
  }, []);



  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const isChecked = e.target.checked;
      setFormValues(prevState => ({
        ...prevState,
        [name]: isChecked
          ? [...prevState[name], value]
          : prevState[name].filter(id => id !== value)
      }));
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const onChangeInputFile = (e) => {
    const files = e.target.files;

    if (FileReader && files && files.length > 0) {
      const file = files[0]
      console.log(files);

      var fr = new FileReader();
      fr.onload = function () {
        if (fr.result) {
          setAvatarSRC(fr.result.toString())
          setIcone(files)
        }
      }
      fr.readAsDataURL(file);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lista de campos a serem ignorados na validação
    const fieldsToIgnore = ['imagem', 'tribunas', 'candidatos'];

    // Verifica se algum campo obrigatório está vazio, exceto os campos a serem ignorados
    const emptyFields = Object.entries(formValues)
      .filter(([key, value]) => !fieldsToIgnore.includes(key) && value === '')
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      // Monta a mensagem de erro indicando os campos vazios
      const errorMessage = emptyFields.map(field => `${field}`).join(', ');
      Swal.fire({
        icon: 'error',
        title: 'Campos obrigatórios não preenchidos',
        html: `Por favor, preencha os seguintes campos obrigatórios:<br>${errorMessage}`,
      });
      return;
    }

    try {
      const img = icone !== undefined ? await upload(formValues.nome, icone, 'usuarios') : 'https://cvfggtwoyyhatnhuumla.supabase.co/storage/v1/object/public/usuarios/perfil-sem-foto.png';
      await sendForm(img);
    } catch (error) {
      console.error('Erro ao realizar o cadastro:', error);
    }
  };

  const sendForm = async (img) => {
    try {
      const response = await fetch('http://localhost:3001/cliente/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: formValues.nome,
          email: formValues.email,
          sexo: formValues.sexo,
          telefone: formValues.telefone,
          bairro: formValues.bairro,
          endereco: formValues.endereco,
          cidade: formValues.cidade,
          estado: formValues.estado,
          status: formValues.status,
          cep: formValues.cep,
          redes_sociais: formValues.redes_sociais,
          password: formValues.password,
          profile: formValues.profile,
          imagem: img,
          tribunas: formValues.tribunas,
          candidatos: formValues.candidatos,
          tribunaIds: formValues.tribunaIds.map(id => parseInt(id)),
          candidatoIds: formValues.candidatoIds.map(id => parseInt(id))
        })
      });

      const clienteData = await response.json();
      console.log('Dados cadastrados com sucesso:', clienteData);
      const clienteId = clienteData.id;

      Swal.fire({
        icon: 'success',
        title: 'Usuário criado com sucesso!',
        text: 'Você será redirecionado para a página de login.'
      }).then(() => {
        // Redirecionar para a página de login após fechar o SweetAlert
        window.location.href = '/login';
      });

      // Laços para criar os vínculos com tribuna e candidato
      await Promise.all(
        formValues.tribunaIds.map(async tribunaId => {
          const tribunaVinculo = {
            cliente: { id: clienteId },
            tribuna: { id: parseInt(tribunaId) }
          };

          const tribunaResponse = await fetch('http://localhost:3001/ct/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(tribunaVinculo)
          });

          const tribunaData = await tribunaResponse.json();
          console.log('Vínculo com tribuna criado com sucesso:', tribunaData);
        }),

        formValues.candidatoIds.map(async candidatoId => {
          const candidatoVinculo = {
            cliente: { id: clienteId },
            candidato: { id: parseInt(candidatoId) }
          };

          const candidatoResponse = await fetch('http://localhost:3001/cc/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(candidatoVinculo)
          });

          const candidatoData = await candidatoResponse.json();
          console.log('Vínculo com candidato criado com sucesso:', candidatoData);
        })
      );
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };



  return (
    <div>
      <NavigationBar />
      <div className="container">
        <h1 className="title">Cadastro</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <div style={{ position: 'relative', width: 190, height: 190, borderRadius: '50%', overflow: 'hidden' }}>
              <input
                ref={inputFile}
                accept="image/png, image/jpeg"
                type="file"
                className="position-absolute opacity-0"
                id="fileInput"
                onChange={onChangeInputFile}
                style={{ top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }}
              />
              <label htmlFor="fileInput" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <img
                  src={avatarSRC}
                  alt="avatar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </label>
            </div>


            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formValues.nome}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label htmlFor="sexo">Sexo:</label>
            <select
              id="sexo"
              name="sexo"
              value={formValues.sexo}
              onChange={handleChange}

            >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formValues.telefone}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado:</label>
            <select
              id="estado"
              name="estado"
              value={formValues.estado}
              onChange={handleChange}

            >
              <option value="">Selecione</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="bairro">Bairro:</label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              value={formValues.bairro}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label htmlFor="endereco">Endereço:</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={formValues.endereco}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label htmlFor="cidade">Cidade:</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={formValues.cidade}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label htmlFor="cep">CEP:</label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={formValues.cep}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label htmlFor="redes_sociais">Rede Social Mais Utilizada:</label>
            <input
              type="text"
              id="redes_sociais"
              name="redes_sociais"
              value={formValues.redes_sociais}
              onChange={handleChange}
              placeholder="Exemplo: Instagram: @seuUsuario, Facebook: nome de usuário"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}

            />
          </div>



          <div className="form-group">
            <label htmlFor="tribunaIds">Selecione as tribunas de interesse:</label>
            {formValues.tribunas.map(tribuna => (
              <div key={tribuna.id}>
                <input
                  type="checkbox"
                  id={`tribuna_${tribuna.id}`}
                  name="tribunaIds"
                  value={tribuna.id}
                  onChange={handleChange}
                />
                <label htmlFor={`tribuna_${tribuna.id}`}>{tribuna.nome}</label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="candidatoIds">Selecione os candidatos de interesse:</label>
            {formValues.candidatos.map(candidato => (
              <div key={candidato.id}>
                <input
                  type="checkbox"
                  id={`candidato_${candidato.id}`}
                  name="candidatoIds"
                  value={candidato.id}
                  onChange={handleChange}
                />
                <label htmlFor={`candidato_${candidato.id}`}>{candidato.nome}</label>
              </div>
            ))}
          </div>
          <Button type="submit" text="Cadastrar" />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Cadastro;
