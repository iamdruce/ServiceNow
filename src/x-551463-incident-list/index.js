import {createCustomElement, actionTypes} from '@servicenow/ui-core';
const {COMPONENT_BOOTSTRAPPED} = actionTypes;
import {createHttpEffect} from '@servicenow/ui-effect-http'
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import "@servicenow/now-template-card"

const view = (state, {updateState}) => {
	const { result } = state
	if (!result) {
		return (
			<div>
				<p>Loading...</p>
			</div>
		)	
	}

	return (
		<div>
			<div align="center"><h1>Incidents</h1></div>
			<div className="wrapper">
				{result.map(item => (
				<div className="cart">
					<now-template-card-assist 
					tagline={{"icon":"tree-view-long-outline","label":"Incident"}} 
					actions={[{"id":"share","label":"Copy URL"},{"id":"close","label":"Mark Complete"}]} 
					heading={{"label":item.short_description}} 
					content={[{"label":"Number","value":{"type":"string","value":item.number}},
					{"label":"State","value":{"type":"string","value":item.state}},
					{"label":"Assignment Group","value":{"type":"string","value":item.assignment_group.display_value}},
					{"label":"Assignet To","value":{"type":"string","value":item.assigned_to.display_value}}]} 
					contentItemMinWidth={'300'} 
					footerContent={{"label":"Updated","value":"2020-05-01 16:09:51"}} 
					configAria={{}}>
					</now-template-card-assist>
				</div>))}
			</div>
		</div>
	);
};

createCustomElement('x-551463-incident-list', {
	actionHandlers: {
		[COMPONENT_BOOTSTRAPPED] : (coeffects) => {
			const { dispatch } = coeffects;
			dispatch('FETCH_LATEST_INCIDENT');
		},
		'FETCH_LATEST_INCIDENT': createHttpEffect('api/now/table/incident?sysparm_display_value=true', {
			method: 'GET',
			successActionType: 'FETCH_LATEST_INCIDENT_SUCCESS'
		}),
		'FETCH_LATEST_INCIDENT_SUCCESS': (coeffects) => {
			const { action, updateState } = coeffects;
			const { result } = action.payload;
			updateState({ result });
		}
	},
	renderer: {type: snabbdom},
	view,
	styles
})
