export const dictionaryMock = `VariableName,PRECISE-CDE Abbrev,PRECISE-TBI CDE Title,Unit_of_Measure,Description,DataType,Multiple Values,PermittedValues,MinimumValue,MaximumValue,Comments,InterLex ID
Subject,GUID,Unique identification of  each mouse ID,,Unique identification of  each mouse ID,Alphanumeric,FALSE,,sub1,sub9,,CDE:0369380
AgeVal,AgeVal,Age of the animal at the time of procedure,minutes; hours; days; weeks; months; years,"Age of the animal at the time of procedure in minutes, hours, days, weeks, months, or years.",Numeric,FALSE,,,,,CDE:0369385
Species,StudySpeciesTyp,Species of the mouse,,Species of the mouse,Alphanumeric,FALSE,,,,,CDE:0369381
Strain,SmallSpeciesStrainTyp,Strain of the mouse,,Strain of the mouse,Alphanumeric,FALSE,,,,,CDE:0369382
Sex,Sex type,Sex of the mouse,,Sex of the mouse,Alphanumeric,FALSE,Female; Male,,,,CDE:0369384
Group,InjuryGroupAssignTyp,Injury group assignment type,,Type of injury group assignment for a study,Alphanumeric,FALSE,"Anesthesia controls;Injured;Naive;Sham Injured;Other, specify",,,,CDE:0369386
StudyInjModelTyp,StudyInjModelTyp,Traumatic Brain Injury (TBI) model type(s),,"Type of Traumatic Brain Injury (TBI) model(s) used to model the mechanism and outcomes of TBI in animal studies, as a part of the Study Metadata",Alphanumeric,TRUE,CCI; FPI; Blast; WD,,,,CDE:0369373
StudyOutcomeMeasureType,StudyOutcomeMeasureType,Type(s) of outcome measures in the study,,"Type of outcome measures used, as a part of the Study Metadata",Alphanumeric,TRUE,"Behavior; Biomarker; Histopathology; Biochemical; Molecular; Imaging; Other, specify",,,,CDE:0369377
Outcome time,StudyOutcomeMeasureTime,Outcome measure time(s) relative to injury,minutes; hours; days; weeks; months; years,"The time post-injury at which the outcome measure(s) was made, together with the unit of measure (minutes; hours; days; weeks; months; years), as a part of the Study Metadata",Numeric,TRUE,,0,1000,,CDE:0369378
Impactor peak velocity value,CCIImpactorPeakVelVal,Impactor peak velocity value,meters/sec,Value of the impactor peak velocity,Numeric,FALSE,,0,10,,ILX.CDE:0368857
Impactor tip diameter - measurement,Impactor tip diameter - measurement,Impactor tip diameter - measurement,Millimeter,Diameter of the impactor,Numeric,FALSE,,0,20,,CDE:0369440
Type of actuator used for impact,Type of actuator used for impact,Type of actuator used for impact,,,Alphanumeric,FALSE,Electromagnetic; pneumatic,,,,CDE:0369439
Rotor rod - start speed,Rotor rod test - start speed value,Rotor rod test - start speed value,rpm,"The rotations per minute of the rod at the start of the run, as part of Rotor rod test",Numeric,FALSE,,0,100,,CDE:0369398
Rotor rod - final speed,Rotor rod test - final speed value,"Rotor rod test - final speed value
",rpm,"The rotations per minute of the rod at the end of the run, as part of Rotor rod test",Numeric,FALSE,,0,100,,CDE:0369399
inpactor cdes,,,,,,,,,,,
Additional impactor CDE,CCIImpactorTipShapeTyp,Impactor tip shape type,,Type of the shape of the impactor,Alphanumeric,,Bevelled;Flat;Hemispherical,,,,ILX.CDE:0368860
,CCIImpactorTipZeroMethTyp,Impactor tip zeroing method type,,Type of method used to zeroing the impactor tip to the cortical surface of the animal,Alphanumeric,,"Electrical continuity circuit;Force sensor;Other, specify;Visual",,,,ILX.CDE:0368861
,CCIImpactorAngleMeasr,Impactor angle measurement,,The measurement of the impactor angle relative to the vertex of the head coronal plane,Numeric,,,,,,ILX.CDE:0368853
,RRDApparatusHabitInd,Rotor rod test - apparatus habituation indicator,,"Indicator, specifying if the animal acclimated to the rotarod prior to testing, as part of Rotor rod test",Boolean,,no;yes,,,,CDE:0369392
Additional Rotorod CDE,RRDApparatusHabitTypTxt,Rotor rod test - Apparatus habituation type text,,"Text describing how the animal was acclimated to the rotorod, as part of Rotor rod test",Alphanumeric,,,,,,CDE:0369394
,RRDFallHeightVal,Rotor rod test - fall height value,Centimeter,"Value (in centimeters ) for how far will the animal fall from the rod, as part of Rotor rod test",Numeric,,,,,,CDE:0369395
,RRDLaneWidthVal,Rotor rod test - lane width value,Millimeter,"Value (in millimeters) of width of the rotor rod test lane, as part of Rotor rod test",Numeric,,,,,,CDE:0369396
,RRDRodDiameterVal,Rotor rod test - rod diameter value,Millimeter,"Value (in millimeters) of the diameter of the rod, as part of Rotor rod test",Numeric,,,,,,CDE:0369397
,RRDRodTextureTyp,Rotor rod test - rod texture type,,"Type of texture of the rod, as part of Rotor rod test",Alphanumeric,,smooth;textured,,,,ILX.CDE:0369135`;

export const datasetMock = `Subject,Species,Strain,Sex,Age,Group,StudyInjModelTyp,StudyOutcomeMeasureType,Type of actuator used for impact,Impactor tip diameter - measurement,roto time,Rotor rod - start speed,Rotor rod - final speed
sub1,Mouse,C57BL/6J,Male,6 weeks,Sham,CCI,Behavior,pneumatic,3,1 week,10,10
sub1,Mouse,C57BL/6J,Male,6 weeks,Sham,CCI,Behavior,pneumatic,3,1 week,11,10
sub7,Mouse,C57BL/6J,Female,6 weeks,Sham,CCI,Behavior,pneumatic,3,1 week,9,12
sub7,Mouse,C57BL/6J,Female,6 weeks,Sham,CCI,Behavior,pneumatic,3,1 week,10,12
sub2,Mouse,C57BL/6J,Male,6 weeks,Naive,None,Behavior,pneumatic,3,1 week,11,13
sub2,Mouse,C57BL/6J,Male,6 weeks,Naive,None,Behavior,pneumatic,3,1 week,12,14
sub8,Mouse,C57BL/6J,Female,6 weeks,Naive,None,Behavior,pneumatic,3,1 week,10,12
sub8,Mouse,C57BL/6J,Female,6 weeks,Naive,None,Behavior,pneumatic,3,1 week,11,11
sub5,Mouse,C57BL/6J,Male,6 weeks,Injuried,CCI,Behavior,pneumatic,3,1 week,8,5
sub5,Mouse,C57BL/6J,Male,6 weeks,Injuried,CCI,Behavior,pneumatic,3,1 week,6,6
sub9,Mouse,C57BL/6J,Female,6 weeks,Injuried,CCI,Behavior,pneumatic,3,1 week,7,5
sub9,Mouse,C57BL/6J,Female,6 weeks,Injuried,CCI,Behavior,pneumatic,3,1 week,5,4`;
