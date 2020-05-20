import React, { PropTypes } from 'react'
import {
	ScrollView,
	TextInput,
	Button,
	Text,
	View,
	Image,
	ActivityIndicator,
	StyleSheet,
	Link,
	TouchableOpacity,
} from 'react-native';

import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from 'react-native-check-box'

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

import TabBarIcon from '../components/TabBarIcon';

import TakeQuestion from '../components/TakeQuestion'
import TakeResult from '../components/TakeResult'
import ShareForm from '../components/ShareForm'

@inject('users') @observer
class Take extends React.Component {
	onPressRegister(email, password, name) { 
		this.props.users.register(email, password, name);
	}
	
	state = {
			isChecked: true,
	}
	
	render() {
		return (
				<KeyboardAwareScrollView style={[allStyles.container, styles.quizFormContainer ]}>
					
					<Text style={ allStyles.heading }>Kwiz Title here</Text>
					<TakeQuestion />
					<TakeResult />
					
					<View style={[allStyles.section]}>
						<Text style={allStyles.sectionTitle}>Share your results!</Text>
						<Text style={allStyles.sectionSubtitle}>Share the fun by sending your results to your friends or posting on social media.</Text>
						<ShareForm />
					</View>
				</KeyboardAwareScrollView>
		) 
	}
}

export default Take;