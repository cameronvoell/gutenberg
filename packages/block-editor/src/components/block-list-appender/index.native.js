/**
 * External dependencies
 */
import { last } from 'lodash';

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import { getDefaultBlockName } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import DefaultBlockAppender from '../default-block-appender';
import styles from './style.scss';

function BlockListAppender( {
	blockClientIds,
	rootClientId,
	canInsertDefaultBlock,
	isLocked,
} ) {
	if ( isLocked ) {
		return null;
	}

	if ( canInsertDefaultBlock ) {
		return (
			<DefaultBlockAppender
				rootClientId={ rootClientId }
				lastBlockClientId={ last( blockClientIds ) }
				containerStyle={ styles.blockListAppender }
				placeholder={ blockClientIds.length > 0 ? '' : null }
			/>
		);
	}

	return null;
}

export default withSelect( ( select, { rootClientId } ) => {
	const {
		getBlockOrder,
		canInsertBlockType,
		getTemplateLock,
	} = select( 'core/block-editor' );

	return {
		isLocked: !! getTemplateLock( rootClientId ),
		blockClientIds: getBlockOrder( rootClientId ),
		canInsertDefaultBlock: canInsertBlockType( getDefaultBlockName(), rootClientId ),
	};
} )( BlockListAppender );
