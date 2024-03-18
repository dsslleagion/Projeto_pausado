import React from 'react';
import './viewforum.css';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const ViewForum = () => {
    // Dados de exemplo para as publicações
    const posts = [
        {
            id: 1,
            ownerName: 'Usuário 1',
            date: '18 de março de 2024',
            imageUrl: 'https://via.placeholder.com/150',
            description: 'Descrição da publicação 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod ligula vel elit bibendum, sit amet ullamcorper justo volutpat. Sed ullamcorper tortor et commodo pharetra.'
        },
        {
            id: 2,
            ownerName: 'Usuário 2',
            date: '17 de março de 2024',
            imageUrl: 'https://via.placeholder.com/150',
            description: 'Descrição da publicação 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod ligula vel elit bibendum, sit amet ullamcorper justo volutpat. Sed ullamcorper tortor et commodo pharetra.'
        }
    ];

    return (
        <div>
            <NavigationBar />
            <div className="forum-container">
                <div className="post-list">
                    {posts.map(post => (
                        <div key={post.id} className="post-card">
                            <div className="post-header">
                                <div className="user-info">
                                    <img src={`https://via.placeholder.com/50/FF5733/FFFFFF/?text=${post.ownerName.charAt(0)}`} alt="Foto do usuário" className="user-photo" />
                                    <span className="owner-name">{post.ownerName}</span>
                                </div>
                                <span className="post-date">{post.date}</span>
                            </div>
                            <img src={post.imageUrl} alt="Imagem da publicação" className="post-image" />
                            <div className="post-description">{post.description}</div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ViewForum;
