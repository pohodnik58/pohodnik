import React from 'react';
import PropTypes from 'prop-types';

function Page({ title, children }) {
    return (
        <section>
            <h1>{title}</h1>
            {children}
        </section>
    );
}


Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired,
};

export default Page;
