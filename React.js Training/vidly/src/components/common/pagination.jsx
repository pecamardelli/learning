import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {
	
	getPageButtons() {
		const { itemCount, currentPage, pageSize, onPageChange }	= this.props;
		
		const pageCount		= Math.ceil(itemCount / pageSize);
		const pageButtons	= [];
		
		for(let i=0;i<pageCount;i++) {
			pageButtons.push( 
				<li className={'page-item' + (i === currentPage ? ' active' : '')}
					key={i}>
					<button className="page-link" value={i} onClick={onPageChange}>{i+1}</button>
				</li> );
		}
		
		return pageButtons;
	}
	
	render() {
		return (
			<React.Fragment>
				<nav aria-label="Page navigation example">
				  <ul className="pagination">
					{this.getPageButtons()}
				  </ul>
				</nav>
			</React.Fragment>
		);
	}
}

Pagination.propTypes	= {
	itemCount: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired
};

export default Pagination;