import TokenPageContent from './page-token';

const TokenPage = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const token = await params;
  return <TokenPageContent token={token.token} />;
};

export default TokenPage;
