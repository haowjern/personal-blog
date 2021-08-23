export type PostPathProps = {
  params: {
    id: string;
  };
};

export type PostDataProps = {
  id?: string;
  title?: string;
  date?: string;
  contentHtml?: string;
};
