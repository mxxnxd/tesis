


stuff = [
  'abdomen_pain',  'anxiety',      'appetite_Loss', 'blurry',
  'bone_pain',     'breath_rapid', 'breath_short',  'chest_pain',
  'chest_tight',   'chills',       'colds',         'colds_long',
  'confusion',     'cough',        'cough_blood',   'cough_hard',
  'cough_long',    'cyanosis',     'dizzy',         'faint',
  'fatigue',       'fever',        'fever_high',    'headaches',
  'heart_rapid',   'heartburn',    'hoarseness',    'muscle_pain',
  'nausea',        'neck_tight',   'pain_arm',      'pain_back',
  'pain_belly',    'pain_jaw',     'pain_neck',     'pain_shoulder',
  'pain_teeth',    'pain_throat',  'pale',          'phlegm_clear',
  'phlegm_green',  'phlegm_red',   'phlegm_white',  'phlegm_yellow',
  'r_infections',  'sleep_hard',   'smoking',       'swallow_hard',
  'sweating_cold', 'swell_ankle',  'swell_belly',   'swell_feet',
  'swell_legs',    'swell_neck',   'throat_clear',  'urine_blood',
  'weakness',      'weightgain',   'weightloss',    'wheeze',
  'wheeze_hard']

count = [
  1, 2, 2, 3,
  1, 2, 11, 12,
  1, 2, 2, 1,
  2, 3, 2, 1,
  6, 4, 8, 4,
  12, 4, 2, 5,
  7, 1, 2, 1,
  4, 1, 1, 1,
  1, 1, 1, 1,
  1, 1, 4, 2,
  2, 4, 2, 2,
  1, 1, 1, 2,
  1, 5, 4, 3,
  1, 3, 1, 1,
  4, 2, 3, 5,
  1
]

start = '{'
end = '}'

with open('code.js', 'w') as f:

  for symp, num in zip(stuff, count):
    f.write(f"const ask_{symp} = {start}\n")
    f.write(f"\tpriority: {num + 1},\n")
    f.write(f"\tcondition: (R, fact) => {start}\n")
    f.write(f"\t\tR.when(fact.user.symptoms.{symp} == null);\n")
    f.write(f"\t{end},\n")
    f.write(f"\tconsequence: (R, fact) => {start}\n")
    f.write(f"\t\tfact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.{symp.upper()}' : 'FI.ASK.{symp.upper()}';\n")
    f.write(f"\t\tR.stop();\n")
    f.write(f"\t{end}\n")
    f.write(f"{end};\n\n")

  f.write(f"\n\n\n")

  for symp in stuff:
    f.write(f"'EN.ASK.{symp.upper()}'\n")
    f.write(f"'FI.ASK.{symp.upper()}'\n")

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