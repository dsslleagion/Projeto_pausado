import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import './CadastroNoticia.css';
import Footer from '../components/Footer';
import MultiSelect from '../components/MultiSelect';
import Descrition from '../components/Description';
import { useContextoTribuna } from '../hooks';

const CadastroNoticia = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: ''
  });
  const [noticias, setNoticias] = useState([]);
  const [editandoNoticia, setEditandoNoticia] = useState(null); // Variável para controlar se está editando uma notícia
  const [ tribunalista, setTribuna ] = useState([])
  const { selectTribuna } = useContextoTribuna()

  // useEffect(() => {
  //   fetchNoticias();
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeDesc = (e) => {
    const name = 'conteudo'
    setFormData({ ...formData, [name]: e });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Limpar o formulário após o envio bem-sucedido
      setFormData({ titulo: '', conteudo: '' });
      //setEditandoNoticia(null); // Limpar o estado de edição
    } catch (error) {
      console.error('Erro ao cadastrar/atualizar notícia:', error.message);
    }
  };

  // const fetchNoticias = async () => {
  //   try {
  //     const response = await fetch('/noticia/noticias', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8'
  //       }
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       const formattedData = data.map((noticia) => ({
  //         id: noticia.id,
  //         titulo: noticia.titulo,
  //         conteudo: noticia.conteudo,
  //         // Se necessário, adicione mais campos aqui
  //       }));
  //       setNoticias(formattedData);
  //     } else {
  //       console.error('Erro ao buscar notícias:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Erro ao buscar notícias:', error.message);
  //   }
  // };

  const handleExcluirNoticia = async (id) => {
    try {
      const response = await fetch(`/noticia/noticias/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Notícia excluída com sucesso!');
        // Recarregar a lista de notícias após excluir
        //fetchNoticias();
      } else {
        console.error('Erro ao excluir notícia:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir notícia:', error.message);
    }
  };
  const handleEditarNoticia = (noticia) => {
    // Preencher o formulário com os dados da notícia selecionada
    setFormData({ titulo: noticia.titulo, conteudo: noticia.conteudo });
    setEditandoNoticia(noticia); // Atualizar o estado para indicar que está editando uma notícia
    // Aqui você pode adicionar a lógica para editar a notícia
    console.log('Editar notícia:', noticia);
  };

  console.log(tribunalista);

  const cadastrarNoticia = async (data) => {
    try {
      await fetch('/noticia/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      }).then(async (res) => {
        const re =  await res.json()
        console.log(re);
        cadastrarNoticiaToTribuna(re.id)
      })
    } catch (error) {
      console.error('Erro ao cadastrar notícia:', error.message);
    }
  };

  console.log(formData.conteudo);

  const cadastrarNoticiaToTribuna = async (data) => {
    try {
      tribunalista.map(async (item) => {
        console.log(item);
        console.log(data);
        await fetch('/tn/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ noticia: data , tribuna: item.value }),
        });
      })
    } catch (error) {
      console.error('Erro ao cadastrar notícia:', error.message);
    }
  };

  const atualizarNoticia = async (id, data) => {
    try {
      const response = await fetch(`/noticia/noticias/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        console.log('Notícia atualizada com sucesso!');
        // Recarregar a lista de notícias após atualizar
        //fetchNoticias();
      } else {
        console.error('Erro ao atualizar notícia:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar notícia:', error.message);
    }
  };

  
  return (
    <div>
      <NavigationBar />
      <div className="container">
        <h1>Cadastro de Notícia</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='tribuna'>Tribuna </label>
            <MultiSelect options={selectTribuna()} set={setTribuna} /> 
          </div>
          <div className="form-group">
            <label htmlFor="conteudo">Conteúdo:</label>
            {/* <textarea id="conteudo" name="conteudo" value={formData.conteudo} onChange={handleChange}></textarea> */}
            <Descrition value={formData.conteudo} setValue={handleChangeDesc} />
          </div>
          <button onClick={() => cadastrarNoticia(formData)} className="edit-button">Enviar</button>
        </form>

        {/* <h2>Notícias</h2>
        <div className="noticias-container">
          {noticias.map((noticia) => (
            <div className="noticia-card" key={noticia.id}>
              <strong>{noticia.titulo}</strong>
              <p>{noticia.conteudo}</p>
              <div className="buttons-container">
                <button onClick={() => handleEditarNoticia(noticia)} className="edit-button">Editar</button>
                <button onClick={() => handleExcluirNoticia(noticia.id)} className="delete-button">Excluir</button>
              </div>
            </div>
          ))}
        </div> */}
        
      </div>
      <Footer />
    </div>
  );
};

export default CadastroNoticia;
