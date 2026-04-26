export interface CustomizationData {
  activityName: string;
  activityBlurb: string;
  category: string;
  durationWeeks: number;
  sessionType: string;
  suburbCity: string;
  availableTransport: string;
  maxParticipants: number;
  minParticipants: number;
  costPerPerson: number;
  capacityLevel: string;
  accessibilityLevel: string;
  groupSizeSupportRatio: string;
  locationPreference: string;
  targetParticipantProfile: string;
  ndisGoals: string;
  additionalNotes: string;
}

export function generatePrompt(data: CustomizationData): string {
  return `You are an expert curriculum designer for a disability day services provider in Victoria, Australia (NDIS context). 
Your task is to generate a complete, professional, and engaging activity outline based on the following parameters. 
The tone must be professional, warm, and inclusive.

PARAMETERS:
- Activity Name: ${data.activityName}
- Activity Blurb/Concept: ${data.activityBlurb}
- Category: ${data.category}
- Duration: ${data.durationWeeks} weeks
- Session Type: ${data.sessionType}
- Location (Suburb/City): ${data.suburbCity}
- Location Preference: ${data.locationPreference}
- Available Transport: ${data.availableTransport}
- Participants: Min ${data.minParticipants}, Max ${data.maxParticipants}
- Group Size & Support Ratio: ${data.groupSizeSupportRatio}
- Cost per person per week: $${data.costPerPerson}
- Capacity Level: ${data.capacityLevel}
- Accessibility Level: ${data.accessibilityLevel}
- Target Participant Profile: ${data.targetParticipantProfile}
- Supported NDIS Goals: ${data.ndisGoals}
- Additional Notes/Requirements: ${data.additionalNotes || "None"}

Please ensure the generated activity outline strictly follows the core theme, style, and concept described in this blurb: "${data.activityBlurb}"

You MUST structure the output EXACTLY using the following sections. Do not deviate from these headings. Fill in all empty placeholders.

### ACTIVITY INFORMATION AND OUTCOMES
[Provide a warm, inclusive 2-3 sentence overview of the activity and its benefits, expanding on the core concept provided.]

**Date:** [Insert current date]
**Review Due date:** [Insert date 6 months from now]

### ACTIVITY DETAILS
**ACTIVITY:** ${data.activityName}
**DAY & TIME:** [Propose a suitable day(s) and time based on the ${data.sessionType} session type]
**PARTICIPANTS:** Minimum ${data.minParticipants}, Maximum ${data.maxParticipants}. Profile: ${data.targetParticipantProfile}. Ratio: ${data.groupSizeSupportRatio}
**LOCATION:** [Provide location details based on ${data.suburbCity} and ${data.locationPreference}]
**CO-ORDINATOR:** TBD
**TRANSPORT DETAILS:** ${data.availableTransport}
**RESOURCES REQUIRED:** [List general resources needed for the program]
**COST PER PERSON:** $${data.costPerPerson} / week

### STAFF SUPPORT REQUIREMENTS
| Requirement | Details |
|---|---|
| Ratio | ${data.groupSizeSupportRatio} |
| Capacity Level | ${data.capacityLevel} |
| Accessibility | ${data.accessibilityLevel} |
| Specific Skills | [List any specific staff skills required] |

### STRUCTURE OF ACTIVITY
**Daily Timeline:**
- **Welcome & Check-in:** [Describe the arrival and transition routine]
- **Main Activity:** [Describe how the main block is structured]
- **Reflection & Wrap-Up:** [Describe how the session ends, clean up, and depart]

### PROGRAM - WEEKLY MATERIALS TABLE
| Week | Title / Focus | Non-Recurring Materials / Equipment |
|---|---|---|
[Generate rows for Weeks 1 to ${data.durationWeeks}]

### FULL ${data.durationWeeks}-WEEK PROGRAM OUTLINE
| Week | Date | Goal Progression | Tasks and Content | Location / Alternative | Non-weekly costs |
|---|---|---|---|---|---|
[Generate rows for Weeks 1 to ${data.durationWeeks}, detailing weekly progressions, tasks, and linking to NDIS Goals: ${data.ndisGoals}. Ensure Week ${data.durationWeeks} includes a "Program Celebration". Include "Rain-out / Cancellation Ideas" in the Location/Alternative column where relevant.]

### STAFF GUIDE (WEEKLY FACILITATION NOTES)
[For each of the ${data.durationWeeks} weeks, provide detailed teaching notes, practical facilitation tips, suggested adaptations for different support needs, safety considerations, engagement strategies, and exactly how to run the session successfully. This must be clear and actionable.]
`;
}
