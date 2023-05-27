yesno = ['Yes', 'Sure', 'Yeah', 'Ok', 'Alright', 'Agree', 'Okay', 'Yep', 'Yup', 'Go ahead', 'Right', 'All right', 'By all means', 'of course', 'correct','No', 'Nah', 'Nope', 'Disagree', 'By no means', 'No thanks', 'Absolutely not', 'Not at all', 'of course not', 'incorrect']
language = ['Tagalog', 'Filipino', 'English', 'Ingles']


with open('entity_phrases.txt', 'w') as f:

	f.write('@BOT-BOOL PHRASES\n')

	for word in yesno:
		f.write(f"/@{word}:bot-bool/*")

	f.write('\n\n@BOT-LANGUAGE PHRASES\n')

	for lang in language:
		f.write(f"/@{lang}:bot-language/*")
		f.write(f"I pick /@{lang}:bot-language/*")
		f.write(f"I choose /@{lang}:bot-language/*")
		f.write(f"/@{lang}:bot-language/ please*")

	f.write('\n\n\n\n\n')