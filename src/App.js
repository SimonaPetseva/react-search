import React, { Component } from 'react';
import axios from 'axios';
import {Card, Col, Row, Button, Icon, ProgressBar} from 'react-materialize';

import './App.css';
import SearchForm from './components/SearchForm/SearchForm';
import Results from './components/Results/Results';

class App extends Component {
  state = {
      inputValue: '',
      showResults: false,
      results: [
          {},
          {},
          {},
          {},
          {}
      ]      
  }  

  getInputValue = (event) =>{
      this.setState({
          inputValue: event.target.value
      });
  }
  
  triggerSearch = () =>{
    const inputValue = this.state.inputValue;
      
    axios({
     method: 'post',
     url: 'https://duedil.io/v4/search/companies.json?limit=5',
     headers: {
       'X-Auth-Token' : 'd3b32f96de2cd41735b3a7a8a48c00f2'
     },
     data: JSON.stringify({
        "criteria": {
             "name": inputValue,
             "countryCodes": {
                 "values": ["GB"]
             }
        }
     })
    })
    .then(response => {
        const companies = response.data.companies;   
        companies.forEach((company, index) => {
            let updatedState = [...this.state.results];
            updatedState[index].name = company.name;
            updatedState[index].key = index;
            this.setState({
                results: updatedState
            });
            
            this.getSocialMedia(company.companyId, index);
            this.setState({
                showResults: true
            });
        });
    })
    .catch(error => console.log(error));     
    
    this.setState({
        inputValue: ''
    });
  }
  
  getSocialMedia = (id, companyIndex) => {  
      
        axios({
            method: 'get',
            url: `https://duedil.io/v4/company/gb/${id}/social-media-profiles.json`,
            headers: {
              'X-Auth-Token' : 'd3b32f96de2cd41735b3a7a8a48c00f2'
            }
        })
        .then(response => {
            const socialMediaProfiles = response.data.socialMediaProfiles;
            socialMediaProfiles.forEach((profile) => {
                let updatedState = [...this.state.results];
                updatedState[companyIndex].url = profile.url;
                this.setState({
                    results: updatedState
                });
            });
        })
        .catch(error => console.log(error)); 
  }
  
  reload = () => {
      window.location.reload();
  }
  
  render() {  
    const results = this.state.results.map(result => {
            return <Results name={result.name} url={result.url} key={result.key}/>;   
    });  
      
    return (
      <div className="App">
        <Row>
        <Col offset="l3 m2 s1" l={6} m={8} s={10}>
            <Card className='white' title='Search Companies'>
                <SearchForm change={(event) => this.getInputValue(event)} triggerSearch={this.triggerSearch} value={this.state.inputValue}/>
                { this.state.showResults ? results : null }
                { this.state.showResults ? <Button onClick={this.reload} waves='light'>Clear Search<Icon left>clear</Icon></Button> : null }
            </Card>
        </Col>
        </Row>
      </div>
    );
  }
}

export default App;
