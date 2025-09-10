"use client";

import React, { useState, useEffect } from "react";
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Row, Badge, Table, Button } from 'react-bootstrap'
import { assetsService, Asset } from '@/services/api/assets'
import { useRouter } from 'next/navigation';
import { buildReirectURL, getFullPath } from "@/helpers/getUrlHelper";
import { formatDate } from "@/utils/date";

interface AssetListTabProps {
  supplierId?: string;
  assetId?: string;
  departmentId?: string;
  supplier?: any; // Supplier object for context
  asset?: any; // Asset object for context
  showCreateButton?: boolean;
  title?: string;
  className?: string;
}

export default function AssetListTab({ 
  supplierId, 
  assetId,
  departmentId,
  supplier, 
  asset,
  showCreateButton = true, 
  title = "Assets",
  className = ""
}: AssetListTabProps) {
  const router = useRouter();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const loadAssets = async () => {
    if (loaded) return;

    try {
      setLoading(true);
      setError("");
      
      let assetData: Asset[];
      
      if (supplierId) {
        // Load assets by supplier ID
        assetData = await assetsService.getAssets({ supplierId });
      } else if (assetId) {
        // Load single asset
        const singleAsset = await assetsService.getAssetById(assetId);
        assetData = [singleAsset];
      } else if (departmentId) {
        // Load assets by department ID
        assetData = await assetsService.getAssets({ departmentId });
      } else {
        // Load all assets
        assetData = await assetsService.getAssets();
      }
      
      setAssets(assetData);
      setLoaded(true);
    } catch (assetErr) {
      console.error('Error fetching assets:', assetErr);
      setAssets([]);
      setLoaded(true);
      setError("Failed to load assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, [supplierId, assetId, departmentId]);

  const handleCreateAsset = () => {
        // Build URL with parameters
        let redirectUrl = '/assets/create';
        const urlParams = new URLSearchParams();    
        if (departmentId) {
          urlParams.append('did', departmentId);
        } else if (supplier) {
          urlParams.append('sid', supplier.id);
        }
        redirectUrl = buildReirectURL(redirectUrl,getFullPath(), urlParams);      
        console.log('Redirecting to:', redirectUrl);
        router.push(redirectUrl);
    
  };

  const handleAssetClick = (assetId: string) => {
    router.push(`/assets/detail?aid=${assetId}`);
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
                    onClick={handleCreateAsset}
                    className="d-flex align-items-center gap-2"
                  >
                    <IconifyIcon icon="tabler:plus" className="fs-16" />
                    Add Asset
                  </Button>
                )}
              </div>

              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted">Loading assets...</p>
                </div>
              ) : error ? (
                <div className="text-center py-4">
                  <p className="text-danger">{error}</p>
                </div>
              ) : assets.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">No assets found</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Asset Name</th>
                        <th>Asset Type</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Serial No</th>
                        <th>Status</th>
                        <th>Created Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assets.map((asset) => (
                        <tr 
                          key={asset.id} 
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleAssetClick(asset.id)}
                        >
                          <td>
                            <span style={{ color: '#0d6efd', textDecoration: 'underline' }}>
                              {asset.assetName}
                            </span>
                          </td>
                          <td>{asset.assetType?.assetName || 'N/A'}</td>
                          <td>{asset.brand || 'N/A'}</td>
                          <td>{asset.model || 'N/A'}</td>
                          <td>{asset.consumerSerialNo || 'N/A'}</td>
                          <td>
                              {asset.assetStatus?.displayName || ''}
                          </td>
                          <td>{formatDate(asset.createdAt!)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}

              {assets.length > 0 && (
                <div className="text-center mt-3">
                  <small className="text-muted">
                    Showing {assets.length} asset{assets.length !== 1 ? 's' : ''}
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
