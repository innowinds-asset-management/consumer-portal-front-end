"use client";

import React from "react";
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Row, Badge, Table, Button } from 'react-bootstrap'
import { useRouter } from 'next/navigation';
import { formatDate } from "@/utils/date";

interface AmcCmcTabProps {
  supplierId?: string;
  supplier?: any; // Supplier object for context
  showCreateButton?: boolean;
  title?: string;
  className?: string;
}

interface AmcCmcEntry {
  id: string;
  contractNumber: string;
  contractType: 'AMC' | 'CMC';
  startDate: string;
  endDate: string;
  totalValue: number;
  status: 'Active' | 'Expired' | 'Pending' | 'Cancelled';
  coverageDetails: string;
  renewalDate?: string;
  autoRenewal: boolean;
}

export default function AmcCmcTab({ 
  supplierId, 
  supplier, 
  showCreateButton = true, 
  title = "AMC/CMC Contracts",
  className = ""
}: AmcCmcTabProps) {
  const router = useRouter();

  // Hardcoded AMC/CMC data
  const amcCmcData: AmcCmcEntry[] = [
    {
      id: "AMC001",
      contractNumber: "AMC-2024-001",
      contractType: "AMC",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      totalValue: 50000,
      status: "Active",
      coverageDetails: "Annual Maintenance Contract covering preventive maintenance, emergency repairs, and spare parts",
      renewalDate: "2024-11-30",
      autoRenewal: true
    }
  ];

  const handleCreateContract = () => {
    if (supplier) {
      router.push(`/amc-cmc/create?sid=${supplier.id}`);
    } else {
      router.push('/amc-cmc/create');
    }
  };

 

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Expired':
        return 'danger';
      case 'Pending':
        return 'warning';
      case 'Cancelled':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getContractTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'AMC':
        return 'primary';
      case 'CMC':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <div className={className}>
      <Row>
        <Col sm="12">
          <Card className="border-0">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="text-muted mb-0">{title}</h6>
                {showCreateButton && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleCreateContract}
                    className="d-flex align-items-center gap-2"
                  >
                    <IconifyIcon icon="tabler:plus" className="fs-16" />
                    Add Contract
                  </Button>
                )}
              </div>

              {amcCmcData.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">No AMC/CMC contracts found</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table striped hover>
                                         <thead>
                       <tr>
                         <th>Contract Number</th>
                         <th>Type</th>
                         <th>Start Date</th>
                         <th>End Date</th>
                         <th>Total Value</th>
                         <th>Status</th>
                       </tr>
                     </thead>
                    <tbody>
                      {amcCmcData.map((contract) => (
                                                 <tr key={contract.id}>
                           <td>{contract.contractNumber}</td>
                           <td>
                             <Badge bg={getContractTypeBadgeColor(contract.contractType)}>
                               {contract.contractType}
                             </Badge>
                           </td>
                           <td>{formatDate(contract.startDate)}</td>
                           <td>{formatDate(contract.endDate)}</td>
                           <td>{contract.totalValue}</td>
                           <td>
                             <Badge bg={getStatusBadgeColor(contract.status)}>
                               {contract.status}
                             </Badge>
                           </td>
                         </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}

              {amcCmcData.length > 0 && (
                <div className="text-center mt-3">
                  <small className="text-muted">
                    Showing {amcCmcData.length} contract{amcCmcData.length !== 1 ? 's' : ''}
                  </small>
                </div>
              )}

              
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
