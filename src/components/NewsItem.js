// import { getByTitle } from '@testing-library/react'
import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    //Why do we need to define props here as well when we work with Class Based Components
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display:'flex', justifyContent:'flex-end',position:'absolute',right:'0'}}>
          <span className="badge rounded-pill bg-primary">
             {source}
            <span className="visually-hidden">unread messages</span>
            </span>
          </div>
            <img src={imageUrl?imageUrl:"https://c.ndtvimg.com/2023-01/e27gm9t_hardik-pandya-pc-bcci_625x300_08_January_23.jpg?"} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text" style={{fontSize:"12px"}}>By {author?author:"Unknown"} on {new Date(date).toGMTString()}</p>
            <a href={newsUrl} className="btn btn-sm btn-dark">Continue Reading</a>
            </div>
            
        </div>
      </div>
    )
  }
}

export default NewsItem
