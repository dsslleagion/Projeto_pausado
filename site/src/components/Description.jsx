import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '../supabase/connection';

export default function Description({ value, setValue }) {
    const [imageURL, setImageURL] = useState('');
    const quillRef = useRef();

    const handleImageUpload = async (file) => {
        try {
            // Upload da imagem para o Supabase Storage
            console.log(file);
            const { data, error } = await supabase.storage
                .from('noticias')
                .upload(`noticias-${Date.now()}`, file);

            if (error) {
                throw error;
            }

            // Se o upload for bem-sucedido, obtenha o URL da imagem
            const imageURL = data.url;

            // Atualize o estado com o URL da imagem
            setImageURL(imageURL);

            // Adicione a imagem ao editor
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', imageURL);
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error.message);
        }
    };

    return (
        <div style={{ height: '700px',overflowY: 'auto' }}>
            <ReactQuill
                theme="snow"
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'direction': 'rtl' }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'font': [] }],
                        [{ 'align': [] }],
                        ['link', 'image', 'video'],
                        ['blockquote', 'code-block'],
                        ['clean']
                    ]
                }}
                value={value}
                onChange={setValue}
                ref={quillRef}
                style={{ height: '100%' }}
            />
        </div>
    );
}
