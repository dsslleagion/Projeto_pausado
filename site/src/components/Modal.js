import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useState } from 'react';

export function ModalComponent({title, children}){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const styleButton = {
        padding: '10px 20px',
        backgroundColor: '#e00a0a',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor:'pointer'
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return(
        <div>
            <Button style={styleButton} onClick={handleOpen}>{title}</Button> 
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    )
}

export function ModalChildren({ image, children }){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return(
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <img
                src={image}
                alt='modal'
                style={{ width: "30px", padding: "3px", cursor: "pointer",borderRadius: 50 }}
                onClick={handleOpen}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    )
}