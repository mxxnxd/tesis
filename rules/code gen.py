


stuff = [
  'abdomen_pain', 'anxiety',      'appetite_loss',
  'arm_pain',     'back_pain',    'belly_swell',
  'blurry',       'bone_pain',    'tachypnea',
  'chest_pain',   'chest_tight',  'chills',
  'colds',        'confusion',    'cough',
  'cyanosis',     'dizzy',        'dysphasia',
  'dyspnea',      'faint',        'fatigue',
  'fever',        'headaches',    'heartburn',
  'hoarseness',   'legs_swell',   'mouth_pain',
  'muscle_pain',  'nausea',       'neck_shoulder_pain',
  'neck_swell',   'neck_tight',   'pale_sweat',
  'phlegm_clear', 'phlegm_green', 'phlegm_red',
  'phlegm_white', 'r_infections', 'sleep_hard',
  'tachycardia',  'urine_blood',  'weakness',
  'weightgain',   'weightloss',   'wheeze']

count = [
  2, 2, 2,
  1,     1, 4,
  3,       1,    2,
  12,   1,  2,
  3,        2,    7,
  4,     8,        4,
  11,      4,        12,
  5,        5,    1,
  2,   5,   1,
  1,  4,       1,
  1,   1,   5,
  2, 2, 4,
  2, 1, 1,
  7,  1,  4,
  2, 3,   5]

start = '{'
end = '}'

# print(sorted(list(zip(stuff, count)), key=lambda x: x[1], reverse=True))



with open('code.js', 'w') as f:

  for symp, num in sorted(list(zip(stuff, count)), key=lambda x: x[1], reverse=True):
    f.write(f"const ask_{symp} = {start}\n")
    f.write(f"\tpriority: {num + 1},\n")
    f.write(f"\tcondition: (R, fact) => {start}\n")
    f.write(f"\t\tR.when(fact.user.symptoms.{symp} == 0);\n")
    f.write(f"\t{end},\n")
    f.write(f"\tconsequence: (R, fact) => {start}\n")
    f.write(f"\t\tfact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-{symp.upper()}' : 'FI-ASK-{symp.upper()}';\n")
    f.write(f"\t\tR.stop();\n")
    f.write(f"\t{end}\n")
    f.write(f"{end};\n\n")

  f.write(f"\n\n\n")

  for symp in stuff:
    f.write(f"'EN-ASK-{symp.upper()}'\n")
    # f.write(f"'fi.ask.{symp.lower()}'\n")

  f.write(f"\n\n\n")

  for symp in stuff:
    f.write(f"R.register(ask_{symp});\n")

# const ask_fever = {
#   priority: 1,
#   condition: (R, fact) => {
#     R.when(fact.user.symptoms.fever == null);
#   },
#   consequence: (R, fact) => {
#     fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.FEVER' : 'FI.ASK.FEVER';
#     R.stop();
#   }
# };