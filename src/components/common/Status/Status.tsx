import React, { ReactElement, useState } from 'react';
import {
	BiMessageSquare,
	BiMessageSquareCheck,
	BiMessageSquareError,
} from 'react-icons/bi';
import { updateStatus } from '../../../apis/word';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../../recoil/userState';

type ChangeStatusProps = {
	initialStatus: number;
	id: string;
}

function ChangeStatus({ initialStatus, id }: ChangeStatusProps): ReactElement {
	const [status, setStatus] = useState<number>(initialStatus);
	const userToken = useRecoilValue(userTokenState);

	const handleChangeStatus = async () => {
		try {
			const updatedStatus = (status + 1) % 3;
			await updateStatus(userToken, id, updatedStatus);
			setStatus(updatedStatus);
		} catch (err) {
			console.log(err);
		}
	}

	function getStatusIcon() {
		switch (status) {
			case 1:
				return <BiMessageSquareCheck />;
			case 2:
				return <BiMessageSquareError />;
			default:
				return <BiMessageSquare />;
		}
	}
	return (
		<div onClick={handleChangeStatus}>{getStatusIcon()}</div>
	);
}

export default ChangeStatus;
