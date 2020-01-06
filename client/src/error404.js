import React from 'react';

const Whoops404 = ({ location }) =>
        <div className="whoops-404">
        <h1>Không tìm thấy trang tại địa chỉ localhost:3000{location.pathname}</h1>
        </div>

export default Whoops404;