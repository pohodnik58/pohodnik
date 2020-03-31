import { useHistory } from 'react-router-dom';

export const navigate = addr => {
    const history = useHistory();
    history.push(addr);
};

export default {
    navigate
};
