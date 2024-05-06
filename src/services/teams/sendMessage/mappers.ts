interface ITeamsMessageRequest {
  type: "MessageCard";
  summary: string;
  title: string;
  subtitle: string;
  facts: {
    name: string;
    value: string | number;
  }[];
}

const mapMessageRequestEntityToApi = (messageRequest: ITeamsMessageRequest) => {
  return {
    "@type": messageRequest.type,
    themeColor: "3ecf8e",
    summary: messageRequest.summary,
    sections: [
      {
        activityTitle: messageRequest.title,
        activitySubtitle: messageRequest.subtitle,
        activityImage:
          "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png",
        facts: messageRequest.facts,
      },
    ],
  };
};

export { mapMessageRequestEntityToApi };

export type { ITeamsMessageRequest };
