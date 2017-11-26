import React from 'react';
import { Link } from 'react-router-dom';

export const Header = ({ title, subtitle, links = [] }) => (
  <header>
    <div className="header-titles">
      {title ? <div className="title"><Link to="/">{title}</Link></div> : null}
      {subtitle ? <div className="subtitle">{subtitle}</div> : null}
    </div>
    <div className="header-links">
      {links.map(({ url, label }, index) => (url[0] === '/' ?
        <Link key={index} to={url}>{label}</Link> :
        <a key={index} href={url}>{label}</a>))}
    </div>
  </header>
);
