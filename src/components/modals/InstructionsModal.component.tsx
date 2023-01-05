import { FC, ReactNode } from 'react'
import { LetterStatus } from '../../../types'
import { usePortal } from '../../hooks/usePortal'
import { LetterBox } from '../LetterBox.component'
interface PropsModal {
	onClose: () => void
}

interface PropsBoxColors {
	children: ReactNode | ReactNode[]
}

interface LetterProps {
	value: string
	status: LetterStatus
}

export const LetterBoxModal: FC<LetterProps> = ({ value, status }) => {
	const statusLetter =
		status === 'correct'
			? 'bg-green'
			: status === 'present'
			? 'bg-yellow'
			: status === 'absent'
			? 'bg-gray'
			: 'bg-white dark:bg-dark'

	return (
		<div
			className={`${statusLetter} flex font-bold ml-[11px] w-[76px] h-[76px] text-black dark:text-white items-center 
			justify-center rounded border-black dark:border-gray border-2 border-solid`}
		>
			<p className='text-4xl font-bold text-center'>{value}</p>
		</div>
	)
}

export const InstructionsModal = ({ onClose }: PropsModal) => {
	const createPortal = usePortal('modal-instructions', 'div')

	const BoxColors = ({ children }: PropsBoxColors) => {
		return (
			<div className='flex items-start justify-between flex-col flex-wrap py-1 mb-2'>
				{children}
			</div>
		)
	}

	return (
		<>
			{createPortal(
				<div className='w-full h-full absolute left-0 sm:top-32 2xl:top-0  bg-neutral-800 flex items-center justify-center'>
					<div className='bg-white dark:bg-dark dark:text-white px-6 py-3 max-w-lg w-full border-black dark:border-gray border-2 border-solid rounded-2xl'>
						<p className='font-extrabold text-4xl text-center pt-2 pb-4'>
							Cómo jugar
						</p>
						<div className='font-normal text-lg'>
							<p className='pb-1'>
								Adivina la palabra oculta en cinco intentos.
							</p>
							<p className='pb-1'>
								Cada intento debe ser una palabra válida de 5 letras.
							</p>
							<p className='pb-2'>
								Después de cada intento el color de las letras cambia para
								mostrar qué tan cerca estás de acertar la palabra.
							</p>
						</div>
						<p className='font-bold text-lg'>Ejemplos</p>
						<BoxColors>
							<div className='flex items-center justify-center flex-row flex-wrap mb-4'>
								<LetterBoxModal value='G' status='correct' />
								<LetterBoxModal value='A' status='edit' />
								<LetterBoxModal value='T' status='edit' />
								<LetterBoxModal value='O' status='edit' />
								<LetterBoxModal value='S' status='edit' />
							</div>
							<p className='font-normal text-lg'>
								La letra <span className='font-bold'>G</span> está en la palabra
								y en la posición correcta.
							</p>
						</BoxColors>
						<BoxColors>
							<div className='flex items-center justify-center flex-row flex-wrap mb-4'>
								<LetterBoxModal value='V' status='edit' />
								<LetterBoxModal value='O' status='edit' />
								<LetterBoxModal value='C' status='present' />
								<LetterBoxModal value='A' status='edit' />
								<LetterBoxModal value='L' status='edit' />
							</div>
							<p className='font-normal text-lg'>
								La letra <span className='font-bold text-left'>C</span> está en
								la palabra pero en la posición incorrecta.
							</p>
						</BoxColors>
						<BoxColors>
							<div className='flex items-center justify-center flex-row flex-wrap mb-4'>
								<LetterBoxModal value='C' status='edit' />
								<LetterBoxModal value='A' status='edit' />
								<LetterBoxModal value='N' status='edit' />
								<LetterBoxModal value='T' status='edit' />
								<LetterBoxModal value='O' status='absent' />
							</div>
							<p className='font-normal text-lg'>
								La letra <span className='font-bold'>O</span> no está en la
								palabra.
							</p>
						</BoxColors>
						<p className='font-normal text-lg py-2'>
							Puede haber letras repetidas. Las pistas son independientes para
							cada letra.
						</p>
						<p className='font-normal text-center text-lg pb-2'>
							¡Una palabra cada 5 minutos!
						</p>
						<div className='grid place-content-center mx-auto'>
							<button
								className='bg-green py-3 px-4 text-white rounded hover:bg-opacity-90'
								onClick={onClose}
							>
								¡Jugar!
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
