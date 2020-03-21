import history from '../history';

export const navigate = addr => {
    history.push(addr);
};

export default {
    navigate
};
