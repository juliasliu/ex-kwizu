import React, { PropTypes } from 'react'
import {
	ScrollView,
	TextInput,
	Button,
	Text,
	View,
	Image,
	ActivityIndicator,
	TouchableOpacity
} from 'react-native';

import TabBarIcon from '../components/TabBarIcon';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

class NewResultForm extends React.Component {
	state= { 
			registerEmail: '', 
			registerPassword: '', 
			registerName: ''
	}
	onPressRegister() { 
		this.props.onPress(this.state.registerEmail, this.state.registerPassword, this.state.registerName);
	}
	render() {
		return (
				<View style={[ styles.quizForm ]}>
					<View style={[ styles.quizFormHeader, styles.resultHeader ]}>
						<Text style={[ styles.quizFormNumber, allStyles.whiteText ]}>Result 1</Text>
					</View>
					<View style={[ allStyles.card ]}>
						{
							this.props.registeringError &&
							<View style={ allStyles.error }>
								<Text>{this.props.registeringError}</Text>
							</View>
						}
						<TextInput
							returnKeyType='next' 
							style={ allStyles.input } 
							onChangeText={(registerEmail) => this.setState({registerEmail})} 
							value={this.state.registerEmail} 
							placeholder='Result title (25 words max)' 
							onSubmitEditing={(event) => {
								this.refs.registerName.focus(); 
							}}
						/>
						<TextInput
							ref='resultDescription' 
							returnKeyType='next' 
							style={[ allStyles.input, allStyles.textarea ]} 
							onChangeText={(registerName) => this.setState({registerName})} 
							returnKeyType='next' 
							value={this.state.registerName} 
							multiline={true}
					    	numberOfLines={5}
							placeholder='Result description (200 words max)' 
							onSubmitEditing={(event) => {
								this.refs.registerPassword.focus();
							}}
						/>
	
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton ]}
				            onPress={() => alert("")}>
							<TabBarIcon name="md-image" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Add image</Text>
						</TouchableOpacity>
					</View>
					
					<View style={ styles.quizFormAdd }>
						<TouchableOpacity style={[ allStyles.button, allStyles.redButton, styles.quizFormAddButton ]}
			                onPress={() => alert("")}>
							<TabBarIcon name="md-trash" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={ allStyles.whiteText }>Delete result</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[ allStyles.button, allStyles.greenButton, styles.quizFormAddButton ]}
			                onPress={() => alert("")}>
							<TabBarIcon name="md-add" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={ allStyles.whiteText }>New result</Text>
						</TouchableOpacity>
					</View>
			</View>
		)
	}
}

export default NewResultForm;