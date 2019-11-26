import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertActor = payload => api.post('/actor', payload);
export const getAllActors = () => api.get('/actors');
export const updateActorById = (id, payload) => api.put(`/actor/${id}`, payload);
export const deleteActorById = id => api.delete(`/actor/${id}`);
export const getActorById = id => api.get(`/actor/${id}`);

const apis = {
    insertActor,
    getAllActors,
    updateActorById,
    deleteActorById,
    getActorById
};

export default apis;