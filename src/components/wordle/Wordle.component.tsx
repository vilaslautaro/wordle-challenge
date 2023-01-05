import { FC, useCallback, useEffect, useReducer } from 'react'
import { useWordNow } from '../../context/wordNow.context'
import wordleReducer, { initialState } from './wordleReducer.reducer'
import { EmptyRow } from '../rows/EmptyRow.component'
import { CompletedRow } from '../rows/CompletedRow.component'
import { CurrentRow } from '../rows/CurrentRow.component'
import { useWindowEvents } from '../../hooks'
import { generateNewWord } from '../../utils'
import { keys } from '../../data/keys'
import { statusGame } from '../../../types'

export const WordleTwo: FC = () => {
	const { word: wordNow } = useWordNow()
	const [{ completedWords, turn, currentWord, gameStatus }, dispatchWordle] =
		useReducer(wordleReducer, initialState)

	const onEnter = useCallback(() => {
		if (currentWord === wordNow) {
			return dispatchWordle({ type: 'win', payload: currentWord })
		}

		if (turn === 6) {
			return dispatchWordle({ type: 'lost', payload: currentWord })
		}

		dispatchWordle({ type: 'continue', payload: currentWord })
	}, [currentWord, wordNow, turn])

	const handleKeyDown = (e: KeyboardEvent) => onKeyPressed(e.key.toUpperCase())

	const onKeyPressed = useCallback(
		(key: string) => {
			if (gameStatus !== statusGame.Playing) return

			if (key === 'BACKSPACE' && currentWord.length > 0)
				return dispatchWordle({ type: 'delete' })

			if (key === 'ENTER' && currentWord.length === 5 && turn <= 6)
				return onEnter()

			if (currentWord.length >= 5) return

			if (keys.includes(key))
				return dispatchWordle({ type: 'onInput', payload: key })
		},
		[gameStatus, currentWord, turn]
	)

	useWindowEvents('keydown', handleKeyDown)

	useEffect(() => {
		dispatchWordle({ type: 'reset', payload: generateNewWord(0) })
	}, [])

	return (
		<div className='w-full grid place-content-center mx-auto'>
			<div className='py-10 mx-auto'>
				{completedWords.map((word, i) => (
					<CompletedRow key={i} word={word} solution={wordNow} />
				))}
				{gameStatus === statusGame.Playing && <CurrentRow word={currentWord} />}
				{Array.from(Array(6 - turn)).map((_, i) => (
					<EmptyRow key={i} />
				))}
			</div>
		</div>
	)
}