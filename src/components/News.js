import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";





export class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize: 6,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  
  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    console.log("Hello, I belong to the News.js Component")
    //states are required when you need to change something dynamically
    this.state = {
        articles: [],
        loading: true,
        page:1,
        totalResults:0

    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    
  }
  async updateNews(){
   this.props.setProgress(0)
   const fetchUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
   this.setState({loading: true})
   let data = await fetch(fetchUrl);
   this.props.setProgress(30)
   //fetch will return a promise
   let parsedData = await data.json()
   this.props.setProgress(60)
   console.log(parsedData)
   this.setState({
    articles: parsedData.articles, 
    totalResults: parsedData.totalResults,
    loading: false
  })
  this.props.setProgress(100)
  }
//Will be executed after render()
  async componentDidMount(){
  this.updateNews();
  }

  handleNextClick= async()=>{
  this.setState({page: this.state.page + 1})
  this.updateNews()
  }
  handlePrevClick= async()=>{
  this.setState({page: this.state.page - 1})
  this.updateNews()
  }
  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1});
    const fetchUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    //Tp adjust initial Loading....
    this.setState({loading: true})
    let data = await fetch(fetchUrl);
    //fetch will return a promise
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
    articles: this.state.articles.concat(parsedData.articles), 
    totalResults: parsedData.totalResults,
    loading: false
  })
  console.log(this.state.totalResults)
  };
  render() {
    return (
      <>
        <h3 className="text-center my-4">NewsMonkey - {this.capitalizeFirstLetter(this.props.category)} </h3>
        {this.state.loading && <h4 className='text-center my-2'>Loading...</h4>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <h4 className='text-center my-2'>Loading...</h4>}
        >
        <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{
           return <div className="col-md-4" key={element.url}>
           <NewsItem title={element.title?element.title:""} description={element.description?element.description.slice(0,87):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
           </div>
        })}
        
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page>=Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News
