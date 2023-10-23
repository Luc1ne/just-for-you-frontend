import Layout from '@/components/backend/Layout';
import userAPI from '@/services/userAccountAPI';
import { AccountListType } from '@/types/User.interface';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Consultation() {
  const router = useRouter();
  const [rowData, setRowData] = useState<AccountListType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userAPI.getList({ 'type': 0, 'page': 1, 'count': 50 });
        const data = response.data.filter((result: { available: boolean; role: string }) =>
          result.available === true && result.role === '學生');

        setRowData(data);
      } catch (error: any) {
        alert(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <h1 style={{ 'marginBottom': '1rem', 'fontSize': '25px' }}>摘要管理</h1>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>使用者姓名</Th>
              <Th>使用者信箱</Th>
              <Th>科系</Th>
              <Th>性別</Th>
              <Th>摘要紀錄</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rowData?.map((data: any, i: number) => (
              <Tr key={i}>
                <Td>{data.userName}</Td>
                <Td>{data.userId}</Td>
                <Td>{data.department !== null ? data.department : '待填寫'}</Td>
                <Td>{data.userSex !== null ? data.userSex : '待填寫'}</Td>
                <Td>
                  <Button flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    _focus={{ 'bg': 'gray.200', }}
                    aria-label="詳細記錄"
                    onClick={() => router.push(`/consultation-manage/${data.userId}`)}>
                    詳細記錄
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
}