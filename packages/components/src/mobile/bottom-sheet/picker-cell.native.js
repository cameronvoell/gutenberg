/**
 * Internal dependencies
 */
import Cell from './cell';
import Picker from '../picker';

export default function BottomSheetPickerCell( props ) {
	const {
		options,
		hideCancelButton,
		onChangeValue,
		onModalShow,
		onModalHide,
		...cellProps
	} = props;

	let picker;

	const onCellPress = () => {
		picker.presentPicker();
	};

	const onChange = ( newValue ) => {
		onChangeValue( newValue );
	};

	return (
		<Cell onPress={ onCellPress } editable={ false } { ...cellProps } >
			<Picker
				hideCancelButton={ hideCancelButton }
				onModalShow={ onModalShow }
				onModalHide={ onModalHide }
				ref={ ( instance ) => picker = instance }
				options={ options }
				onChange={ onChange }
			/>
		</Cell>
	);
}
