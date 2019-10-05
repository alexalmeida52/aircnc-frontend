import React, {useState, useMemo} from 'react';
import api from '../../services/api';
import camera from '../../assets/camera.svg';

import './styles.css';

export default function Index({ history }){
    const [empresa, setEmpresa] = useState('');
    const [tech, setTech] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => { 
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData();

        data.append('thumbnail', thumbnail);
        data.append('company', empresa);
        data.append('price', price);
        data.append('techs', tech);

        await api.post('/spots', data, {
            headers: {
                user_id: localStorage.getItem('user_id')
            }
        });


        history.push('/dashboard');
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
            <label id="thumbnail" 
            style={{backgroundImage: `url(${preview})`}}
            className={thumbnail ? 'has-thumbnail' : ''}>
                <input 
                type="file"
                onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select img"/>
            </label>
            <label htmlFor="company"> EMPRESA * </label>
                <input 
                id="company" 
                type="text" 
                placeholder="Sua empresa incrível"
                value={empresa}
                onChange={event => setEmpresa(event.target.value)} />

                <label htmlFor="techs">Tecnologias * <span>(separadas por vírgula)</span></label>
                <input 
                id="techs" 
                type="text" 
                placeholder="Quais tecnologias usam?"
                value={tech}
                onChange={event => setTech(event.target.value)} />

                <label htmlFor="price"> Preço * </label>
                <input 
                id="price" 
                type="text" 
                placeholder="Valor por dia"
                value={price}
                onChange={event => setPrice(event.target.value)} />

                <button className="btn" type="submit">Cadastrar</button>
            </form>
        </>
        
    )
}