import React from 'react';

const TribunaForm = ({ formData, handleChange, handleSubmit, editMode }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
        />
        <label htmlFor="nome">Descrição:</label>
        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
        ></textarea>
      </div>
      <label htmlFor="link_grupo">link_grupo:</label>
        <input
          type="text"
          id="link_grupo"
          name="link_grupo"
          value={formData.link_grupo}
          onChange={handleChange}
        />
      <div className="form-group">
        <button className="button" type="submit">
          {editMode ? 'Atualizar' : 'Cadastrar'}
        </button>
      </div>
    </form>
  );
};

export default TribunaForm;
