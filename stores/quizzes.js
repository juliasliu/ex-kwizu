import {observable, computed, map, toJS, action} from 'mobx'; 
import axios from 'axios'
import { API_ROOT } from '../constants';

class Quizzes {
	@observable quiz = null;
	@observable id = null;
	@observable busy = false; 
	@observable errors = null;
	@observable success = null;
	
	@action create = function(quiz) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			/*
			 * things to check for:
			 * every field exists and is less than assigned chars long
			 * every choice in each question is assigned to a different result weight
			 */
			
			axios.post(API_ROOT + '/quizzes', {quiz: quiz, questions: quiz.questions, results: quiz.results}, {withCredentials: true})
			.then(response => {
				if (response.data.status === 'created') {
					that.handleSuccess(response.data.quiz)
					if (!quiz.public) {
						that.success = "Your Kwiz was saved successfully";
					}
					resolve(response.data.quiz);
				} else {
					that.handleErrors(response.data.errors)
					console.log('creating errors:', response.data.errors)
					reject(response.data.errors);
				}
			})
			.catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	
	@action index = function() {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/quizzes', {withCredentials: true})
	        .then(response => {
	            that.handleSuccess()
	        	resolve(response.data.quizzes);
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	@action search = function(keyword) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/quizzes/search/' + keyword, {withCredentials: true})
	        .then(response => {
	            that.handleSuccess()
				resolve(response.data.quizzes);
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	@action show = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/quizzes/' + id, {withCredentials: true})
	        .then(response => {
				that.handleSuccess(response.data.quiz)
	            resolve({quiz: response.data.quiz, quizzing: response.data.quizzing});
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	@action leader = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/quizzes/' + id + '/leader', {withCredentials: true})
	        .then(response => {
	            that.handleSuccess(response.data.quiz)
				resolve({quiz: response.data.quiz, users: response.data.users, quizzings: response.data.quizzings });
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	@action recommend = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/quizzes/' + id + '/recommend', {withCredentials: true})
	        .then(response => {
	            that.handleSuccess();
	            /* use this quiz and current user to find 5 total recommended quizzes
				 * 1. popularity (highest number of taken_users): pick 5
				 * 2. predictive (based on current quiz topic, TBD): pick 5
				 * 3. collaborative (quizzes taken by friends): pick 5
				 * merge by deleting overlaps among the 3 categories
				 */
	            let quizzes = [];
	            quizzes = quizzes.concat(response.data.popularity);
	            quizzes = quizzes.concat(response.data.predictive);
	            quizzes = quizzes.concat(response.data.collaborative);
	            
	            // delete duplicates
	            quizzes = quizzes.filter(function(item, pos) {
	                return quizzes.findIndex(elem => elem.id === item.id) == pos;
	            })
	            
	            quizzes = quizzes.slice(0, 5);

				resolve(quizzes);
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	@action save = function(quizzing) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.post(API_ROOT + '/quizzes/save', {quizzing: quizzing, result_id: quizzing.result_id, choice_ids: quizzing.choice_ids}, {withCredentials: true})
	        .then(response => {
	            that.handleSuccess()
	            resolve(response.data);
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	@action update = function(quiz) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.put(API_ROOT + '/quizzes/' + quiz.id, {quiz: quiz, questions: quiz.questions, results: quiz.results}, {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess(response.data.quiz);
	        	that.success = "Your kwiz was saved successfully";
	            resolve(response.data.quiz);
	        })
	        .catch(errors => {
	        	that.handleErrors(errors)
				console.log('api errors:', errors)
	        	reject(errors)
	        })
		})
	}
	
	@action delete = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.delete(API_ROOT + '/quizzes/' + id, {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess(null);
	            resolve(response.data.status);
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	handleSuccess(quiz) {
		if (quiz) this.quiz = quiz;
		if (quiz) this.id = quiz.id;
		this.busy = false; 
		this.errors = null;
		this.success = null;
	}
	
	handleErrors(errors) {
		this.quiz = null;
		this.id = null;
		this.busy = false; 
		this.errors = errors
		this.success = null;
	}
}

const quizzes = new Quizzes();
export default quizzes;