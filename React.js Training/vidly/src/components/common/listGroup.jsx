import React from 'react';

//class Genres extends Component {
//	render() {
function ListGroup(props) {
	const { items, valueProperty, textProperty, selectedItem, onItemSelect }	= props;
	
	return (
		<React.Fragment>
			<ul className="list-group">
				{
					items.map(item =>
						<li
							className={'list-group-item' + (selectedItem[textProperty] === item.name ? ' active' : '')}
							onClick={() => onItemSelect(item)}
							role='button'
							key={item[valueProperty]}
							>{item[textProperty]}
						</li>)
				}
			</ul>
		</React.Fragment>
	);
}

ListGroup.defaultProps	= {
	textProperty:	'name',
	valueProperty:	'_id'
}

export default ListGroup;